import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { guidedSellingSolutionValidationSchema } from 'validationSchema/guided-selling-solutions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.guided_selling_solution
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGuidedSellingSolutionById();
    case 'PUT':
      return updateGuidedSellingSolutionById();
    case 'DELETE':
      return deleteGuidedSellingSolutionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGuidedSellingSolutionById() {
    const data = await prisma.guided_selling_solution.findFirst(
      convertQueryToPrismaUtil(req.query, 'guided_selling_solution'),
    );
    return res.status(200).json(data);
  }

  async function updateGuidedSellingSolutionById() {
    await guidedSellingSolutionValidationSchema.validate(req.body);
    const data = await prisma.guided_selling_solution.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGuidedSellingSolutionById() {
    const data = await prisma.guided_selling_solution.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
