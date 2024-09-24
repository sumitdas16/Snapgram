import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(createdDate: string): string {
  // Parse the date string into a Date object
  const createdDateTime: Date = new Date(createdDate);
  
  // Get the current time
  const now: Date = new Date();

  // Calculate the difference in milliseconds
  const delta: number = now.getTime() - createdDateTime.getTime();

  // Convert the difference to seconds, minutes, hours, and days
  const seconds: number = Math.floor(delta / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  // Return the formatted time difference
  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}


export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
