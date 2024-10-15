import imagekit from "../config/imageKit.js";

export const uploadImage = async (req, res) => {
  try {
    // `req.file` contiene el archivo subido por `multer`
    const { originalname, buffer } = req.file;

    if (!buffer || !originalname) {
      return res.status(400).json({ message: "El archivo es necesario" });
    }

    const response = await imagekit.upload({
      file: buffer.toString("base64"), // Convertir buffer a base64
      fileName: originalname,
    });

    res.status(200).json({ imageUrl: response.url });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    res.status(500).json({ message: "Error al subir la imagen" });
  }
};
