/**
 * Converts a string to slug format.
 * Example: "Herbs of the World" => "herbs_of_the_world"
 *
 * @param text - The input string to be converted.
 * @returns A slugified string.
 */
export const toSlug = (text: string): string => {
    return text
      .trim() // Remove extra whitespace from both ends
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters except spaces
      .replace(/\s+/g, "_"); // Replace spaces with underscores
  };
  