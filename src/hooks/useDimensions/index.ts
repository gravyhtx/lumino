import { useContainerDimensions } from "./useContainerDimensions";
import { useQueryWidth } from "./useQueryWidth";
import { useViewportDimensions } from "./useViewportDimensions";

export { useContainerDimensions } from "./useContainerDimensions";
export { useViewportDimensions } from "./useViewportDimensions";
export { useQueryWidth } from "./useQueryWidth";

const useDimensions = () => {
  return {
    container: useContainerDimensions(),
    viewport: useViewportDimensions(),
    query: useQueryWidth()
  }
}

export default useDimensions;