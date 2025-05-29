import CONFIG from "../config";

export async function getStories() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal mengambil cerita");
  }

  return await response.json();
}

export async function getStoryDetailById(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengambil detail cerita");
    }

    const data = await response.json();
    return data.story;
  } catch (error) {
    console.error("Gagal mengambil detail story:", error);
    return null;
  }
}

export async function postStory(formData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}
