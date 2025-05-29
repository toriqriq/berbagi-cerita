import { postStory } from "../model/story-api";

export default class BagikanPresenter {
  constructor(view) {
    this.view = view;
  }

  async kirimCerita({ description, photo, lat, lon }) {
    if (!description || !photo) {
      this.view.tampilkanError("Deskripsi dan foto wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat && lon) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    try {
      await postStory(formData);
      this.view.tampilkanSukses("Cerita berhasil dibagikan!");
    } catch (error) {
      this.view.tampilkanError("Gagal mengunggah cerita: " + error.message);
    }
  }
}
