
interface BlogIdPageProps {
    params: Promise<{blogId: string}>
}

const BlogId = async ({ params }: BlogIdPageProps) => {
    const id = (await params).blogId
    
    return (

        <div>
            <h1>
                blog id is {id}
            </h1>
        </div>
    )
}

export default BlogId