import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all blogs or single blog
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get('id')

    if (blogId) {
      // Get single blog
      const blog = await prisma.blog.findUnique({
        where: { id: blogId }
      })

      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }

      return NextResponse.json(blog)
    }

    // Get all published blogs
    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new blog (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can create blogs.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        excerpt: body.excerpt || body.content.substring(0, 150) + '...',
        content: body.content,
        category: body.category || 'Tutorial',
        isPublished: body.isPublished !== false,
        authorId: session.user.id
      }
    })

    return NextResponse.json(
      { message: 'Blog created successfully', blog },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE blog (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get('id')

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID required' }, { status: 400 })
    }

    await prisma.blog.delete({
      where: { id: blogId }
    })

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
