/**
 * EmailJS Client Integration Helper for IronCore Fitness
 */

export interface EmailJSParams {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  plan_name: string;
  amount: number | string;
  payment_id?: string;
  order_id?: string;
  subject?: string;
}

export async function sendEmailJS(params: EmailJSParams) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS keys are missing in environment variables. Email notification skipped.');
    return { success: false, message: 'EmailJS credentials not configured' };
  }

  const targetEmail = (params.customer_email || '').trim();
  const subjectText = params.subject || `💪 Order Confirmed - ${params.plan_name} Receipt`;

  if (!targetEmail) {
    console.error('EmailJS Error: customer_email is empty.');
    return { success: false, error: 'Recipient email address is empty' };
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          subject: subjectText,
          // Recipient Email Aliases (covers all possible template setting fields in EmailJS)
          to_email: targetEmail,
          customer_email: targetEmail,
          user_email: targetEmail,
          email: targetEmail,
          to: targetEmail,
          reply_to: targetEmail,
          
          // Customer & Plan Details
          to_name: params.customer_name,
          customer_name: params.customer_name,
          customer_phone: params.customer_phone,
          plan_name: params.plan_name,
          amount: params.amount,
          payment_id: params.payment_id || 'N/A',
          order_id: params.order_id || 'N/A',
        },
      }),
    });

    if (response.ok) {
      console.log('EmailJS Sent Successfully to:', targetEmail);
      return { success: true };
    } else {
      const errText = await response.text();
      console.error('EmailJS Error response:', errText);
      return { success: false, error: errText };
    }
  } catch (error: any) {
    console.error('EmailJS Exception:', error);
    return { success: false, error: error?.message || 'Failed to send via EmailJS' };
  }
}
