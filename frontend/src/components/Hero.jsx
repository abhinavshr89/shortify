import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useShortenUrlMutation } from "@/store/apiSlice";
import { Loader2, X, Copy } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [shortenUrl, { isLoading }] = useShortenUrlMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shortenUrl(longUrl).unwrap();
      setShortUrl(response.shortUrl);
      setPopoverOpen(true);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Shortened URL copied to clipboard!");
  };

  const handleClosePopover = () => {
    setPopoverOpen(false);
    setShortUrl(null);
  };

  return (
    <div className="h-screen bg-hero-pattern bg-cover text-white flex items-center justify-center flex-col gap-0">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="font-clash max-sm:text-[35px] text-[80px] text-center sm:leading-[100px]">
        Shrink. Share. Simplify.
      </div>
      <div className="font-poppins text-[30px]  max-sm:text-[15px] text-center px-[10px]">
        Paste your long URL and get a clean, shareable link in seconds.
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[50%] h-[50px] mt-[30px] flex relative w-[80%]"
      >
        <Input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full border-none bg-white text-black font-poppins font-semibold "
        />
        <Button
          type="submit"
          className="h-full bg-[#8C50D7] absolute text-white font-bold border-none right-0 sm:w-[15%] flex items-center justify-center no-hover"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Shorten"}
        </Button>
      </form>
      {shortUrl && (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button className="mt-4 bg-[#8C50D7] text-white font-bold no-hover">
              View Shortened URL
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white text-black p-4 rounded-md shadow-lg flex flex-col items-start gap-2">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold text-sm">{shortUrl}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClosePopover}
                className="p-1 no-hover"
              >
                <X className="w-4 h-4 sm:w-fit" />
              </Button>
            </div>
            <Button
              onClick={handleCopy}
              className="bg-[#8C50D7] text-white font-bold w-full no-hover"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </PopoverContent>
        </Popover>
      )}
      <Button
        onClick={() => navigate("/qr")}
        className="mt-4 bg-[#8C50D7] text-white font-bold no-hover"
      >
        Go to QR Page
      </Button>
    </div>
  );
}
