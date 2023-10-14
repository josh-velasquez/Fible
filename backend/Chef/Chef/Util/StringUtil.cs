namespace Chef.Util 
{
    public static class StringUtil 
    {
        // We expect string to have the form item1;item2;item3;item4
        public static string CleanStringArray(string stringArray) {
            if (stringArray != null) {
                return stringArray.Replace("[", "").Replace("]", "").Replace("\"", "");
            }
            return stringArray ?? "";
        }
    }
}