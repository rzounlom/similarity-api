import { NextApiRequest, NextApiResponse } from "next";

import { CreateApiData } from "@/types/api/key";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { z } from "zod";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    //find user in session
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    //throw error if no user session found
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized to perform this action.",
        createdApiKey: null,
      });
    }

    //check if user already has a valid API Key
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    //throw error is user already has a valid api key
    if (existingApiKey) {
      return res.status(400).json({
        error: "You already have a valid API Key",
        createdApiKey: null,
      });
    }

    //create new key
    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    res.status(200).json({
      error: null,
      createdApiKey,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, createdApiKey: null });
    }

    return res
      .status(500)
      .json({ error: "Internal server error", createdApiKey: null });
  }
};

export default withMethods(["GET"], handler);
