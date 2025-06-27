// Logging Middleware for AffordMed React App
// Sends logs to http://20.244.56.144/evaluation-service/logs

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const ALLOWED_PACKAGES = [
  // Backend only
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
  // Frontend only
  "api", "component", "hook", "page", "state", "style",
  // Both
  "auth", "config", "middleware", "utils"
];

// Updated credentials and user details
const USER_DETAILS = {
  email: "rohit.22scse1010606@galgotiasuniversity.edu.in",
  name: "Rohit Raj",
  rollNo: "22131010667",
  accessCode: "Muagvq",
  clientID: "30b684f8-0b16-45cc-88bd-79cf7ed9b04a",
  clientSecret: "HFGywkbfyBKcqHwW"
};

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyb2hpdC4yMnNjc2UxMDEwNjA2QGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE0NzIwLCJpYXQiOjE3NTEwMTM4MjAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxZTc1Zjg4My02MjEwLTRmMmItYTBlMy1iZTgxNzE5YzE3OGUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJyb2hpdCByYWoiLCJzdWIiOiIzMGI2ODRmOC0wYjE2LTQ1Y2MtODhiZC03OWNmN2VkOWIwNGEifSwiZW1haWwiOiJyb2hpdC4yMnNjc2UxMDEwNjA2QGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6InJvaGl0IHJhaiIsInJvbGxObyI6IjIyMTMxMDEwNjY3IiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiMzBiNjg0ZjgtMGIxNi00NWNjLTg4YmQtNzljZjdlZDliMDRhIiwiY2xpZW50U2VjcmV0IjoiSEZHeXdrYmZ5QktjcUh3VyJ9.V53dALQKz5Ygi-h82oab4WNp6GYC2ocI8GdCROniiZc";

/**
 * Sends a log to the AffordMed log API.
 * @param {"backend"|"frontend"} stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level
 * @param {string} pkg - package name
 * @param {string} message
 * @returns {Promise<object>} API response
 */
async function log(stack, level, pkg, message) {
  // Validate inputs
  if (!ALLOWED_STACKS.includes(stack)) throw new Error("Invalid stack");
  if (!ALLOWED_LEVELS.includes(level)) throw new Error("Invalid level");
  if (!ALLOWED_PACKAGES.includes(pkg)) throw new Error("Invalid package");
  if (typeof message !== "string" || !message.trim()) throw new Error("Message must be a non-empty string");

  const body = { stack, level, package: pkg, message, ...USER_DETAILS };

  const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Logging failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

module.exports = log; 