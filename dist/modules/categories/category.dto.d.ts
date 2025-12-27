export declare class CreateCategoryDto {
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    isActive?: boolean;
    sortOrder?: number;
    parentId?: number | null;
}
export declare class UpdateCategoryDto {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
    isActive?: boolean;
    sortOrder?: number;
    parentId?: number | null;
}
export declare class CategoryQueryDto {
    search?: string;
    isActive?: boolean;
    parentId?: number | null;
    onlyParents?: boolean;
    onlyChildren?: boolean;
    page?: number;
    limit?: number;
}
