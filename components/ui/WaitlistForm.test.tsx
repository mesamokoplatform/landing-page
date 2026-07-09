import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaitlistForm } from "./WaitlistForm";

describe("WaitlistForm", () => {
  afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

  it("disables submission and warns when no key is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY_DINER", "");
    render(<WaitlistForm audience="diner" />);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText(/not yet configured/i)).toBeInTheDocument();
  });

  it("posts to Web3Forms and shows success", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY_DINER", "test-key");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<WaitlistForm audience="diner" />);
    await userEvent.type(screen.getByPlaceholderText("you@example.com"), "me@example.com");
    await userEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));
    await waitFor(() => expect(screen.getByText(/you're on the list/i)).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" })
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.access_key).toBe("test-key");
    expect(body.email).toBe("me@example.com");
  });

  it("posts to Web3Forms and shows success for restaurant audience", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY_RESTAURANT", "resto-key");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<WaitlistForm audience="restaurant" />);
    await userEvent.type(screen.getByPlaceholderText("you@example.com"), "restaurant@example.com");
    await userEvent.click(screen.getByRole("button", { name: /become a partner restaurant/i }));
    await waitFor(() => expect(screen.getByText(/you're on the list/i)).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" })
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.access_key).toBe("resto-key");
    expect(body.email).toBe("restaurant@example.com");
  });
});
