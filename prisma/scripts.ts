import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createList({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) {
  try {
    return await prisma.list.create({
      data: {
        title: title,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addItemToList({
  url,
  description,
  listId,
}: {
  url: string;
  description?: string;
  listId: string;
}) {
  try {
    return await prisma.listItem.create({
      data: {
        url,
        description,
        listId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getItemsByListId(listId: string) {
  try {
    return await prisma.listItem.findMany({
      where: { listId },
    });
  } catch (error) {
    throw error;
  }
}

export async function getLists(userId: string) {
  try {
    return await prisma.list.findMany({
      where: { userId },
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteItem(listItemId: string) {
  try {
    return await prisma.listItem.delete({
      where: { id: listItemId },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteList(listId: string) {
  try {
    await prisma.listItem.deleteMany({
      where: { listId },
    });

    return await prisma.list.delete({
      where: { id: listId },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getListById(listId: string) {
  try {
    return await prisma.list.findUnique({
      where: { id: listId },
    });
  } catch (error) {
    throw error;
  }
}

export async function updateList({
  listId,
  title,
}: {
  listId: string;
  title: string;
}) {
  try {
    return await prisma.list.update({
      where: { id: listId },
      data: { title },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateItem({
  itemId,
  url,
  description,
}: {
  itemId: string;
  url?: string;
  description?: string;
}) {
  try {
    return await prisma.listItem.update({
      where: { id: itemId },
      data: { url, description },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
