import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Vérifier si la méthode est POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Méthode non autorisée" });
  }

  try {
    // L'URL de votre workflow N8N avec le Webhook
    // Dans pages/api/trigger-n8n.ts
    const n8nWebhookUrl =
      process.env.N8N_WEBHOOK_URL ||
      "http://localhost:5678/webhook/test-webhook";

    // Transmettre les données reçues au webhook N8N
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...req.body,
        source: "nextjs-app",
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`N8N a répondu avec le statut: ${n8nResponse.status}`);
    }

    const data = await n8nResponse.json();

    // Renvoyer la réponse de N8N à votre application frontend
    return res.status(200).json({
      success: true,
      message: data.message || "Opération réussie!",
      data: data,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion avec N8N:", error);
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la connexion avec N8N",
    });
  }
}
