# Frequência Arquetípica — Quiz Landing Page

Landing page de captura de leads para o quiz "Descubra Seu Arquétipo Dominante".

**Stack:** Next.js 14 (App Router) · React 18 · CSS Modules · Node.js (API Routes)

---

## Rodar localmente

```bash
cd agencia-marketing/clientes/frequenciarquetipica/site
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

## Configurar variáveis de ambiente

Edite o arquivo `.env.local`:

```
MAKE_WEBHOOK_URL=https://hook.make.com/SEU_WEBHOOK
QUIZ_URL=https://tally.so/r/SEU_QUIZ
```

- `MAKE_WEBHOOK_URL` → webhook do Make.com que recebe nome + WhatsApp e dispara o fluxo de WhatsApp
- `QUIZ_URL` → link do quiz no Tally.so para onde o lead é redirecionado após preencher o form

---

## Estrutura

```
app/
  layout.js          ← Fonts (Cinzel, EB Garamond, Inter) + metadata SEO
  page.js            ← Página principal composta por componentes
  page.module.css    ← Estilos da página
  globals.css        ← Design tokens + estilos globais
  api/submit/
    route.js         ← POST /api/submit — valida dados e envia para Make.com

components/
  Nav.js             ← Navbar sticky
  LeadForm.js        ← Formulário (hero e final CTA), com fetch para a API
  FAQ.js             ← Accordion com useState
  Reveal.js          ← Wrapper de scroll reveal (IntersectionObserver)
```

---

## Deploy na Vercel

```bash
npm install -g vercel
vercel --prod
```

Adicionar as variáveis de ambiente no painel da Vercel:
`Settings → Environment Variables → MAKE_WEBHOOK_URL + QUIZ_URL`