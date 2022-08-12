import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";
import { describe, expect, test } from "vitest";

describe("Router", () => {
  test("renders router link", () => {
    const song = {
      docID: "abc",
    };

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    expect();
  });
});
