import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, whatsapp, arquetipo, respostas } = body;

    /* ── Validação ── */
    if (!nome?.trim() || !whatsapp?.trim()) {
      return NextResponse.json(
        { error: 'Nome e WhatsApp são obrigatórios.' },
        { status: 400 }
      );
    }

    const phone = whatsapp.replace(/\D/g, '');
    if (phone.length < 10 || phone.length > 11) {
      return NextResponse.json(
        { error: 'WhatsApp inválido. Verifique o número.' },
        { status: 400 }
      );
    }

    /* ── Salva no Supabase ── */
    const { error: dbError } = await supabase
      .from('leads')
      .insert({
        nome:      nome.trim(),
        whatsapp:  phone,
        origem:    'quiz-landing',
        arquetipo: arquetipo  || null,
        respostas: respostas  ? JSON.stringify(respostas) : null,
        criado_em: new Date().toISOString(),
      });

    if (dbError) {
      console.error('[submit] Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Erro ao salvar. Tente novamente.' },
        { status: 500 }
      );
    }

    /* ── Make.com (opcional) ── */
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl && !webhookUrl.includes('SEU_WEBHOOK')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: nome.trim(), whatsapp: phone, origem: 'quiz-landing' }),
        });
      } catch (hookErr) {
        // Não bloqueia o fluxo se o webhook falhar
        console.warn('[submit] Webhook falhou:', hookErr.message);
      }
    }

    /* ── Resposta ── */
    const quizUrl = process.env.QUIZ_URL;
    const redirect = quizUrl && !quizUrl.includes('SEU_QUIZ') ? quizUrl : null;

    return NextResponse.json({ success: true, redirect });

  } catch (err) {
    console.error('[submit] Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}
