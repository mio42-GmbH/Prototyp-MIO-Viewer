import { Component, Host, h, Prop, Listen, Element } from "@stencil/core";

@Component({
  tag: "mio-viewer-impfpass-dismissable-card",
  styleUrl: "mio-viewer-impfpass-dismissable-card.css",
  shadow: true,
})
export class MioViewerImpfpassDismissableCard {
  @Prop() dismissMenuCallback: () => void;

  @Element() cardElement: HTMLElement;

  @Listen("click", { target: "window" })
  outsideClickHandler(event: globalThis.Event) {
    for (let target of event.composedPath()) {
      if (!(target instanceof Node)) {
        continue;
      }
      if (this.cardElement.contains(target as HTMLElement)) {
        return;
      }
    }
    this.dismissMenuCallback();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
