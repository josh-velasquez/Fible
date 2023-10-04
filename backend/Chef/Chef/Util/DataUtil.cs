namespace Chef.Util
{
	public static class DataUtil
	{
		public static string SaveImageToServer(string imagesPath, IFormFile file)
		{
            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(imagesPath, uniqueFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
			{
				file.CopyTo(stream);
			}
			return uniqueFileName;
		}
	}
}

