import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { guidedSellingSolutionValidationSchema } from 'validationSchema/guided-selling-solutions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGuidedSellingSolutions();
    case 'POST':
      return createGuidedSellingSolution();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGuidedSellingSolutions() {
    const data = await prisma.guided_selling_solution
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'guided_selling_solution'));
    return res.status(200).json(data);
  }

  async function createGuidedSellingSolution() {
    await guidedSellingSolutionValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.guided_selling_solution.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
