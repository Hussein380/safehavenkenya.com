export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(data: ContactFormData): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error(
      "Contact form is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY and redeploy."
    );
  }

  const requestBody = {
    access_key: accessKey,
    subject: `New Contact Form Message: ${data.subject}`,
    from_name: data.name,
    email: data.email,
    message: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${
      data.phone || "Not provided"
    }\n\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
  };

  if (import.meta.env.DEV) {
    // Helpful during local development only
    // eslint-disable-next-line no-console
    console.log("Sending contact message via Web3Forms", {
      hasAccessKey: !!accessKey,
    });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  let json: any;
  try {
    json = await response.json();
  } catch {
    throw new Error(`Failed to parse Web3Forms response (status ${response.status}).`);
  }

  if (!response.ok || !json?.success) {
    const message =
      json?.message ||
      `Failed to send message via Web3Forms. Status: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }
}

