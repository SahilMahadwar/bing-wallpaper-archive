import { json, LoaderFunctionArgs } from "@vercel/remix";
import axios from "axios";
import { ubuntuThemes } from "~/data/ubuntu-themes";
import { getColorTheme } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const wallpaperRes = await axios.get(
      "https://bing.biturl.top/?resolution=3840&format=json&index=0&mkt=zh-CN"
    );

    const wallpaperData = wallpaperRes.data;

    const theme = await getColorTheme({
      imagePath: wallpaperData.url,
      theme: ubuntuThemes,
    });

    return json(
      {
        success: true,
        data: {
          ...wallpaperData,
          theme: theme.name,
        },
      },
      200
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle errors
    console.error("Error fetching data:", error);
    return json({ success: false, error: error.message }, 500);
  }
};
