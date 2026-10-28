export async function onRequestPost(context: { request: Request; env: { CONTACT_EMAIL: string; RESEND_API_KEY?: string } }) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      service: formData.get('service'),
      message: formData.get('message'),
    };

    // Validierung
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'Pflichtfelder fehlen' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // E-Mail versenden (via Resend API oder fetch zu externem Service)
    const emailHtml = `
      <h2>Neue Kontaktanfrage - DGUV V3 Prüfung</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>E-Mail:</strong> ${data.email}</p>
      <p><strong>Firma:</strong> ${data.company || 'Nicht angegeben'}</p>
      <p><strong>Interesse:</strong> ${data.service || 'Nicht angegeben'}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${data.message}</p>
    `;

    // Hier Resend API oder anderer E-Mail-Service
    if (env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kontaktformular <noreply@jankelly.de>',
          to: [env.CONTACT_EMAIL],
          subject: `Neue Anfrage: DGUV V3 Prüfung - ${data.name}`,
          html: emailHtml,
          reply_to: data.email,
        }),
      });
    } else {
      // Fallback: Formspree, Netlify Forms, oder Log nur
      console.log('Kontaktformular:', data);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Serverfehler' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}