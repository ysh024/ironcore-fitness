import { NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  preferredTiming: z.enum(['Morning (6 AM - 10 AM)', 'Evening (5 PM - 10 PM)']),
  targetGoal: z.enum(['Weight Loss', 'Muscle Gain', 'General Fitness', 'Crossfit & Strength']),
  locality: z.enum(['Indirapuram', 'Raj Nagar Extension', 'Vaishali', 'Vasundhara', 'Ghaziabad Central', 'Other']),
  notes: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    // Simulated CRM / Database lead insertion log
    console.log('--- NEW GHAZIABAD GYM LEAD RECEIVED ---', {
      ...validatedData,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Your 3-Day Free Trial Pass has been registered! Our Ghaziabad desk team will contact you shortly via call/WhatsApp.',
      lead: validatedData
    }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid submission data',
        errors: error.issues
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Server error processing lead submission'
    }, { status: 500 });
  }
}
