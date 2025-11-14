
export async function CreateAccountUseCase(request: any) {
    if(!request.name)
        return { status: 400, message: "Name is required" };
}