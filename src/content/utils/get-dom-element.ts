// Adapted from: https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists/16726669

const getDOMElement = (
  selector: string,
  document: Document
): Promise<Element> => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export { getDOMElement };
