# Deployment Guide

## Environment Variables

Configure as seguintes variáveis de ambiente na Vercel:

### Database
```
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/DATABASE_NAME
```

### Authentication (NextAuth.js)
```
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=https://your-domain.com
```

### AI APIs (Optional)
```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY
GOOGLE_AI_API_KEY=YOUR_GOOGLE_KEY
OPENAI_API_KEY=sk-proj-YOUR_KEY
```

## MongoDB Setup

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com/)
2. Crie um novo Database User
3. Configure Network Access (IP whitelist)
4. Copie a connection string
5. Adicione ao `.env.local` e Vercel

## Vercel Deployment

```bash
vercel --prod
```

## Security Notes

⚠️ **NUNCA** commite arquivos contendo:
- API keys
- Database passwords
- Authentication secrets

Sempre use variáveis de ambiente!
