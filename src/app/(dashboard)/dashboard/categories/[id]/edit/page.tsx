import { CategoryForm } from "@/components/dashboard/CategoryForm";

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <CategoryForm categoryId={id} />;
}
