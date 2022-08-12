import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";
import { describe, expect, test, vi } from "vitest";

// vi.mock() allows to mock a dependency
// below we are mocking a firebase dependency
// first argument must match a dependency import path,
// second argument is a function that returns an object
// the case below, the object will contain data for the store action we are testing
vi.mock("@/includes/firebase/firebase", () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe("stores", () => {
  // beforeEach() fucntion will runa  test before each test is executed
  // we're using it to reset Pinia instance, so the stores wouldn't leak from test to test
  beforeEach(() => {
    // setActivePinia function is tricking Pinia by simulationg a Vue instance, to create a Pinia store
    setActivePinia(createPinia());
  });

  test("authenticate user", async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).not.toBe(true);
    await store.authenticate({});
    expect(store.userLoggedIn).toBe(true);
  });
});
