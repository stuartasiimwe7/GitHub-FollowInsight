"use client";

import '../app/globals.css';  // Ensure this path is correct

import { useState } from "react";

interface GitHubUser {
  login: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const fetchAllPages = async (url: string) => {
    let results: GitHubUser[] = [];
    let page = 1;
    let per_page = 100; // GitHub API max per_page is 100
    while (true) {
      const headers: Record<string, string> = {};
      if (GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
      } else {
        if (page === 1) {
          console.warn("GitHub token not set. You may hit rate limits or get incomplete results.");
        }
      }
      const res = await fetch(`${url}?per_page=${per_page}&page=${page}`, { headers });
      if (!res.ok) break;
      const data: GitHubUser[] = await res.json();
      results = results.concat(data);
      if (data.length < per_page) break; // No more pages
      page++;
    }
    return results;
  };

  const fetchGitHubData = async () => {
    if (!username) return;

    try {
      setError("");
      const [followersData, followingData] = await Promise.all([
        fetchAllPages(`https://api.github.com/users/${username}/followers`),
        fetchAllPages(`https://api.github.com/users/${username}/following`),
      ]);

      setFollowers(followersData.map((user: GitHubUser) => user.login));
      setFollowing(followingData.map((user: GitHubUser) => user.login));
    } catch (err) {
      setError("Failed to fetch data. Try again later.");
    }
  };

  // Find users who are not following back and those who are not followed back
  const notFollowingBack = followers.filter((follower) => !following.includes(follower));
  const notFollowedBack = following.filter((followed) => !followers.includes(followed));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-aqua p-6">
      <div className="text-center mb-6">
        <h1>GitHub Follow Insight</h1>
      </div>

      <div className="flex flex-col items-center mb-6 w-full max-w-md">
        <div className="text-center mb-6 bg-green-100 p-4 rounded">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={fetchGitHubData}
            className="bg-blue-500 text-white px-4 py-2 rounded-r border border-blue-500"
          >
            Check
          </button>
        </div>
      </div>


      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <table className="table-auto w-full border-collapse text-center mt-6">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-blue-500 text-white">Your Followers</th>
            <th className="py-3 px-4 bg-green-500 text-white">People You Follow</th>
            <th className="py-3 px-4 bg-blue-500 text-white">Not Following Back</th>
            <th className="py-3 px-4 bg-red-500 text-white">Not Followed Back</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 bg-white">
              {followers.length > 0 ? (
                <ul className="list-none">
                  {followers.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>No followers found</span>
              )}
            </td>
            <td className="border p-2 bg-green-100">
              {following.length > 0 ? (
                <ul className="list-none">
                  {following.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>Not following anyone</span>
              )}
            </td>
            <td className="border p-2 bg-blue-100">
              {notFollowingBack.length > 0 ? (
                <ul className="list-none">
                  {notFollowingBack.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>Everyone is following you back</span>
              )}
            </td>
            <td className="border p-2 bg-red-100">
              {notFollowedBack.length > 0 ? (
                <ul className="list-none">
                  {notFollowedBack.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>You are following everyone back</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
