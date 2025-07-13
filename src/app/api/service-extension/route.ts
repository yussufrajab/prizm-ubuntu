import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { ROLES } from '@/lib/constants';

const serviceExtensionSchema = z.object({
  employeeId: z.string().min(1),
  submittedById: z.string().min(1),
  status: z.string(),
  currentRetirementDate: z.string().datetime(),
  requestedExtensionPeriod: z.string().min(1),
  justification: z.string().min(1),
  documents: z.array(z.string()),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = serviceExtensionSchema.parse(body);

    const newRequest = await db.serviceExtensionRequest.create({
      data: {
        ...parsedData,
        reviewStage: 'initial',
      },
       include: {
        employee: { select: { name: true, zanId: true, department: true, cadre: true, employmentDate: true, dateOfBirth: true, institution: { select: { name: true } }, payrollNumber: true, zssfNumber: true }},
        submittedBy: { select: { name: true, role: true } },
      },
    });
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("[SERVICE_EXTENSION_POST]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const userRole = searchParams.get('userRole');
  const userInstitutionId = searchParams.get('userInstitutionId');

  if (!userId || !userRole) {
    return new NextResponse("User ID and Role are required", { status: 400 });
  }

  try {
    const includeOptions = {
        employee: { select: { name: true, zanId: true, department: true, cadre: true, employmentDate: true, dateOfBirth: true, institution: { select: { name: true } }, payrollNumber: true, zssfNumber: true }},
        submittedBy: { select: { name: true, role: true } },
        reviewedBy: { select: { name: true, role: true } },
    };

    const whereClause: any = {};
    
    if (userRole === ROLES.HRO) {
        whereClause.submittedById = userId;
    } else if (userRole === ROLES.HRMO) {
        whereClause.reviewStage = { in: ['initial', 'commission_review'] };
        whereClause.status = { in: ['Pending HRMO Review', 'Pending HRMO/HHRMD Review', 'Request Received – Awaiting Commission Decision'] };
    } else if (userRole === ROLES.HHRMD) {
        whereClause.reviewStage = { in: ['initial', 'HHRMD_review', 'commission_review'] };
        whereClause.status = { in: ['Pending HRMO Review', 'Pending HHRMD Review', 'Pending HRMO/HHRMD Review', 'Request Received – Awaiting Commission Decision'] };
    } else {
        whereClause.status = { notIn: ["Approved by Commission", "Rejected by Commission"] };
    }
    
    const requests = await db.serviceExtensionRequest.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: includeOptions,
    });
    
    return NextResponse.json(requests);
  } catch (error) {
    console.error("[SERVICE_EXTENSION_GET]", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
