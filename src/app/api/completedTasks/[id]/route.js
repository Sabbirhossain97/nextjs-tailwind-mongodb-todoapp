import Todo from "../../../../models/todo";

export async function PUT(request, context) {
  try {
    const { id } = context.params;
    const completedTask = await request.json();
    const { time } = completedTask;
    await Todo.findByIdAndUpdate(id, {
      completed: true,
      comnpletedAt: time,
    });
    return new Response("successfully updated todo!");
  } catch (err) {
    return new Response(err, "error updating todo!");
  }
}
