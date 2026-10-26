import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "weekly_challenge_photos";
const TOTAL_WEEKS = 54;
const DAY = 24 * 60 * 60 * 1000;
// week 1 starts on the Sunday before Jan 1, 2026 (calendar weeks start on Sunday)
const FIRST_WEEK_START = new Date(2025, 11, 28);

function weekStart(week) {
  return new Date(FIRST_WEEK_START.getTime() + (week - 1) * 7 * DAY);
}

function formatRange(week) {
  const start = weekStart(week);
  const end = new Date(start.getTime() + 6 * DAY);
  const fmt = (d) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
}

function getCurrentWeek() {
  return Math.floor((Date.now() - FIRST_WEEK_START.getTime()) / (7 * DAY)) + 1;
}

function loadPhotos(currentWeek) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // storage unavailable, fall back to sample photos
  }
  // sample photos for the past 3 weeks
  const photos = {};
  for (let i = 1; i <= 3; i++) {
    const week = currentWeek - i;
    if (week >= 1)
      photos[week] = `https://picsum.photos/seed/family-week-${week}/600/450`;
  }
  return photos;
}

// shrink the image so it fits in localStorage
async function fileToDataUrl(file) {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, 800 / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

export default function WeeklyChallengePage() {
  const [currentWeek] = useState(getCurrentWeek);
  const [photos, setPhotos] = useState(() => loadPhotos(currentWeek));
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef(null);
  const currentCard = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      alert("Could not save the photo. Your browser storage might be full.");
    }
  }, [photos]);

  useEffect(() => {
    currentCard.current?.scrollIntoView({ block: "center" });
  }, []);

  async function upload(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const dataUrl = await fileToDataUrl(file);
    setPhotos((prev) => ({ ...prev, [currentWeek]: dataUrl }));
  }

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="text-center">
        <div className="text-5xl font-bold">Weekly Challenge 💥</div>
        <div className="text-2xl font-bold text-green-500 mt-3">
          📸 Complete Family Photo Album 2026
        </div>
        <div className="text-lg font-bold opacity-60 mt-1">
          Capture your favorite moments and add one photo every week.
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {weeks.map((week) => {
          const photo = photos[week];
          const isCurrent = week === currentWeek;
          const isPast = week < currentWeek;

          if (isCurrent) {
            return (
              <div
                key={week}
                ref={currentCard}
                onClick={() => fileInput.current.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  upload(e.dataTransfer.files[0]);
                }}
                className={`cursor-pointer flex flex-col rounded-xl border-2 border-dashed border-green-500 p-2 ${dragging ? "bg-green-500/30" : "bg-green-500/10 hover:bg-green-500/20"}`}
              >
                <div className="font-bold text-green-500">This Week</div>
                <div className="text-sm font-bold opacity-60 mb-2">
                  {formatRange(week)}
                </div>
                {photo ? (
                  <img
                    src={photo}
                    alt={`Week ${week}`}
                    className="aspect-[4/3] w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="aspect-[4/3] flex flex-col items-center justify-center text-center font-bold rounded-lg">
                    <div className="text-3xl">⬆️</div>
                    <div className="text-sm">
                      Drop a photo here or click to upload
                    </div>
                  </div>
                )}
                {photo && (
                  <div className="text-xs font-bold opacity-60 mt-1 text-center">
                    Drop or click to replace
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={week}
              className={`flex flex-col rounded-xl border-2 border-purple-300/20 p-2 ${isPast ? "" : "opacity-40"}`}
            >
              <div className="font-bold">Week {week}</div>
              <div className="text-sm font-bold opacity-60 mb-2">
                {formatRange(week)}
              </div>
              {photo ? (
                <img
                  src={photo}
                  alt={`Week ${week}`}
                  className="aspect-[4/3] w-full object-cover rounded-lg"
                />
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center font-bold rounded-lg bg-base-300/50 text-sm">
                  {isPast ? "No photo" : "🔒 Locked"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          upload(e.target.files[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
