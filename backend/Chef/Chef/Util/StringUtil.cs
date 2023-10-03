namespace Chef.Util 
{
    public static class StringUtil 
    {
        public static string CleanStringArray(string stringArray) {
            if (stringArray != null) {
                return stringArray.Replace("[", "").Replace("]", "").Replace("\"", "");
            }
            return stringArray ?? "";
        }
    }
}