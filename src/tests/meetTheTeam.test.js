import {
    shallowMount,
    mount
} from '@vue/test-utils'

import MeetTheTeam from "../pages/meetTheTeam/MeetTheTeam.vue";
import '../mock/intersectionObserverMock.js';

describe('should display the header', () => {
    test("tests data attributes", () => {
        const wrapper = shallowMount(MeetTheTeam)
        const header = wrapper.find(".header");
        expect(header.text()).toEqual("Meet the Team");
    })
})

describe('should switch to list view when toggle is clicked', () => {
    test("tests data attributes", async () => {
        const wrapper = mount(MeetTheTeam);
        const toggleButton = wrapper.find("i.fa-grid-2");
        toggleButton.trigger("click");
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isCardView).toBe(false);
    })
})