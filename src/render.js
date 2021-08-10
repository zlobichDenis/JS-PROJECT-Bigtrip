export const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
};


export const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

export const replace = (newComponent, oldComponent) => {
    const parentElement = oldComponent.getElement().parentElement;
    const oldElement = oldComponent.getElement();
    const newElement = newComponent.getElement();

    const isExistElement = !!(parentElement && newElement && oldElement);

    if(isExistElement && parentElement.contains(oldElement)) {
        parentElement.replaceChild(newElement, oldElement);
    }
};

export const render = (container, component, place) => {
    const element = component.getElement();
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;
        case RenderPosition.BEFOREEND:
            container.append(element)
            break;
    }
};