import { nextTick } from "vue";

//  This is a very specific util created to "improve" VueMultiselect behaviour.
export const makeScrollToSelectedOnOpen = async ({
  selector,
}: {
  selector: string;
}) => {
  await nextTick();

  document
    .querySelector(`${selector} .multiselect__option--selected`)
    ?.closest("li")
    ?.scrollIntoView();
};
