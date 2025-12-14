import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all subjects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeTopics = searchParams.get('includeTopics') === 'true'
    const onlyActive = searchParams.get('active') === 'true'

    const subjects = await prisma.subject.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      include: includeTopics ? {
        topics: {
          orderBy: { createdAt: 'asc' }
        }
      } : undefined,
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(subjects)
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new subject (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can create subjects.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Manual validation
    if (!body.name || body.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Check if subject already exists
    const existing = await prisma.subject.findFirst({
      where: { name: body.name }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Subject with this name already exists' },
        { status: 400 }
      )
    }

    const subject = await prisma.subject.create({
      data: {
        name: body.name,
        description: body.description || null,
        icon: body.icon || null,
        isActive: body.isActive !== false
      }
    })

    return NextResponse.json(
      { message: 'Subject created successfully', subject },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating subject:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PUT update subject (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Subject ID required' }, { status: 400 })
    }

    const body = await request.json()

    const subject = await prisma.subject.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        icon: body.icon,
        isActive: body.isActive
      }
    })

    return NextResponse.json({ message: 'Subject updated successfully', subject })
  } catch (error) {
    console.error('Error updating subject:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE subject (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Subject ID required' }, { status: 400 })
    }

    await prisma.subject.delete({ where: { id } })

    return NextResponse.json({ message: 'Subject deleted successfully' })
  } catch (error) {
    console.error('Error deleting subject:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}