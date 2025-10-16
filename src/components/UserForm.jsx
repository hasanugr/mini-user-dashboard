"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction, editUserAction } from "@/app/actions";
import { useUsers } from "@/context/UsersProvider";
import Input from "@/components/Input";
import {
  STORAGE_KEYS,
  VALIDATION_PATTERNS,
  FIELD_LIMITS,
  VALIDATION_MESSAGES,
} from "@/lib/constants";

/**
 * User form component for creating and editing users
 * Handles form submission with validation, API calls, and localStorage persistence
 *
 * @typedef {Object} GeoLocation
 * @property {string} [lat] - Latitude coordinate
 * @property {string} [lng] - Longitude coordinate
 *
 * @typedef {Object} Address
 * @property {string} [street] - Street address
 * @property {string} [suite] - Suite/apartment number
 * @property {string} [city] - City name
 * @property {string} [zipcode] - Postal code
 * @property {GeoLocation} [geo] - Geographic coordinates
 *
 * @typedef {Object} Company
 * @property {string} [name] - Company name
 * @property {string} [catchPhrase] - Company catch phrase
 * @property {string} [bs] - Company business/service description
 *
 * @typedef {Object} User
 * @property {number|string} [id] - User ID
 * @property {string} [name] - Full name
 * @property {string} [username] - Username
 * @property {string} [email] - Email address
 * @property {string} [phone] - Phone number
 * @property {string} [website] - Website URL
 * @property {Address} [address] - Address information
 * @property {Company} [company] - Company information
 *
 * @typedef {Object} UserFormProps
 * @property {"create" | "edit"} [mode="create"] - Form mode (create or edit)
 * @property {User} [initialUser] - Initial user data for edit mode
 *
 * @param {UserFormProps} props
 * @returns {JSX.Element}
 */
export default function UserForm({ mode = "create", initialUser }) {
  const router = useRouter();
  const { addUserLocal, editUserLocal } = useUsers();

  async function handleCreate(_prev, formData) {
    const res = await createUserAction(formData);

    const newUser = {
      id: `local-${res?.created?.id + Date.now()}`,
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      address: {
        street: formData.get("street"),
        suite: formData.get("suite"),
        city: formData.get("city"),
        zipcode: formData.get("zipcode"),
        geo: {
          lat: formData.get("lat"),
          lng: formData.get("lng"),
        },
      },
      company: {
        name: formData.get("companyName"),
        catchPhrase: formData.get("catchPhrase"),
        bs: formData.get("bs"),
      },
    };

    addUserLocal(newUser);

    try {
      const a = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ADDED_USERS) || "[]"
      );

      localStorage.setItem(
        STORAGE_KEYS.ADDED_USERS,
        JSON.stringify([newUser, ...a])
      );
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
    router.push("/?created=1");
    return null;
  }

  async function handleEdit(_prev, formData) {
    if (initialUser?.id && !String(initialUser.id).startsWith("local-")) {
      await editUserAction(initialUser.id, formData);
    }

    const updatedUser = {
      id: initialUser.id,
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      address: {
        street: formData.get("street"),
        suite: formData.get("suite"),
        city: formData.get("city"),
        zipcode: formData.get("zipcode"),
        geo: {
          lat: formData.get("lat"),
          lng: formData.get("lng"),
        },
      },
      company: {
        name: formData.get("companyName"),
        catchPhrase: formData.get("catchPhrase"),
        bs: formData.get("bs"),
      },
    };

    editUserLocal(updatedUser);

    try {
      const a = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.EDITED_USERS) || "[]"
      );
      const updatedUsers = a.map((user) =>
        user.id === initialUser.id ? updatedUser : user
      );
      localStorage.setItem(
        STORAGE_KEYS.EDITED_USERS,
        JSON.stringify(updatedUsers)
      );
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
    router.push("/?edited=1");
    return null;
  }

  const [pendingCreate, formActionCreate] = useActionState(handleCreate, null);
  const [pendingEdit, formActionEdit] = useActionState(handleEdit, null);

  const pending = mode === "create" ? pendingCreate : pendingEdit;
  const formAction = mode === "create" ? formActionCreate : formActionEdit;

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    // Validate all inputs before submission
    const inputs = form.querySelectorAll(
      "input[required], input[pattern], input[minlength], input[maxlength]"
    );
    let hasErrors = false;
    let firstErrorInput = null;

    inputs.forEach((input) => {
      // Trigger blur to show validation errors
      input.dispatchEvent(new Event("blur", { bubbles: true }));

      if (
        !input.validity.valid ||
        (input.hasAttribute("required") && input.value.trim() === "")
      ) {
        hasErrors = true;
        if (!firstErrorInput) {
          firstErrorInput = input;
        }
      }
    });

    if (hasErrors) {
      e.preventDefault();
      if (firstErrorInput) {
        firstErrorInput.focus();
      }
      return;
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8"
    >
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="name"
            label="Full Name"
            defaultValue={initialUser?.name}
            required
            minLength={FIELD_LIMITS.NAME.min}
            maxLength={FIELD_LIMITS.NAME.max}
            placeholder="e.g., John Doe"
            validationMessage={VALIDATION_MESSAGES.FULLNAME_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            }
          />
          <Input
            name="username"
            label="Username"
            defaultValue={initialUser?.username}
            required
            pattern={VALIDATION_PATTERNS.USERNAME.source}
            minLength={FIELD_LIMITS.USERNAME.min}
            maxLength={FIELD_LIMITS.USERNAME.max}
            placeholder="e.g., johndoe123"
            validationMessage={VALIDATION_MESSAGES.USERNAME_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            }
          />
          <Input
            name="email"
            label="Email Address"
            type="email"
            defaultValue={initialUser?.email}
            required
            pattern={VALIDATION_PATTERNS.EMAIL.source}
            maxLength={FIELD_LIMITS.EMAIL.max}
            placeholder="e.g., john@example.com"
            validationMessage={VALIDATION_MESSAGES.EMAIL_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            }
          />
          <Input
            name="phone"
            label="Phone Number"
            type="tel"
            defaultValue={initialUser?.phone}
            pattern={VALIDATION_PATTERNS.PHONE.source}
            maxLength={FIELD_LIMITS.PHONE.max}
            placeholder="e.g., +1 (555) 123-4567, 5543332211"
            validationMessage={VALIDATION_MESSAGES.PHONE_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            }
          />
          <Input
            name="website"
            label="Website"
            type="text"
            defaultValue={initialUser?.website}
            pattern={VALIDATION_PATTERNS.WEBSITE.source}
            maxLength={FIELD_LIMITS.WEBSITE.max}
            placeholder="e.g., example.com or https://example.com"
            validationMessage={VALIDATION_MESSAGES.WEBSITE_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            }
          />
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="street"
            label="Street"
            defaultValue={initialUser?.address?.street}
            maxLength={FIELD_LIMITS.STREET.max}
            placeholder="e.g., 123 Main St"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            }
          />
          <Input
            name="suite"
            label="Suite/Apt"
            defaultValue={initialUser?.address?.suite}
            maxLength={FIELD_LIMITS.SUITE.max}
            placeholder="e.g., Apt. 4B"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            }
          />
          <Input
            name="city"
            label="City"
            defaultValue={initialUser?.address?.city}
            maxLength={FIELD_LIMITS.CITY.max}
            placeholder="e.g., New York"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            }
          />
          <Input
            name="zipcode"
            label="Zipcode"
            defaultValue={initialUser?.address?.zipcode}
            pattern={VALIDATION_PATTERNS.ZIPCODE.source}
            maxLength={FIELD_LIMITS.ZIPCODE.max}
            placeholder="e.g., 12345"
            validationMessage={VALIDATION_MESSAGES.ZIPCODE_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            }
          />
          <Input
            name="lat"
            label="Latitude"
            defaultValue={initialUser?.address?.geo?.lat}
            pattern={VALIDATION_PATTERNS.COORDINATES.source}
            placeholder="e.g., -37.8136"
            validationMessage={VALIDATION_MESSAGES.LAT_COORDINATES_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            }
          />
          <Input
            name="lng"
            label="Longitude"
            defaultValue={initialUser?.address?.geo?.lng}
            pattern={VALIDATION_PATTERNS.COORDINATES.source}
            placeholder="e.g., 144.9631"
            validationMessage={VALIDATION_MESSAGES.LNG_COORDINATES_INVALID}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            }
          />
        </div>
      </div>

      {/* Company Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Company
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="companyName"
            label="Company Name"
            defaultValue={initialUser?.company?.name}
            maxLength={FIELD_LIMITS.COMPANY_NAME.max}
            placeholder="e.g., Acme Corporation"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            }
          />
          <Input
            name="catchPhrase"
            label="Catch Phrase"
            defaultValue={initialUser?.company?.catchPhrase}
            maxLength={FIELD_LIMITS.CATCH_PHRASE.max}
            placeholder="e.g., Innovative solutions for tomorrow"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            }
          />
          <div className="md:col-span-2">
            <Input
              name="bs"
              label="Business"
              defaultValue={initialUser?.company?.bs}
              maxLength={FIELD_LIMITS.BUSINESS.max}
              placeholder="e.g., synergize end-to-end solutions"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          disabled={pending}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 cursor-pointer"
        >
          {pending ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {mode === "create" ? "Creating..." : "Saving..."}
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mode === "create" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                )}
              </svg>
              {mode === "create" ? "Create User" : "Save Changes"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>
    </form>
  );
}
