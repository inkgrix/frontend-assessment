import { RegisterResponse, UserCredential } from "@/types/auth";

const API_KEY = process.env.NEXT_PUBLIC_REQRES_API_KEY;
if (!API_KEY) {
  console.warn("Missing API_KEY");
}

export const loginUser = async (
  credential: UserCredential,
): Promise<{ token: string }> => {
  try {
    const res = await fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
      body: JSON.stringify(credential),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "login failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

export const registerUser = async (
  credential: UserCredential,
): Promise<RegisterResponse> => {
  try {
    const res = await fetch(`https://reqres.in/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
      body: JSON.stringify(credential),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "register failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

export const ListUsers = async (page: number = 1) => {
  try {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Faild to fetch Users");
    }

    return await res.json();
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

export const GetUserById = async (id: number) => {
  try {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Faild to fetch Data");
    }

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const UpdateUser = async (
  id: number,
  data: { name: string; job: string },
) => {
  try {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Faild to Updated User");
    }

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const DeleteUserById = async (id: number) => {
  try {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Faild to Deleted User");
    }

    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
