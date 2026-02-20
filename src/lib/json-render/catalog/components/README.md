# Component Catalogs

Contains the component catalogs for the JSON Renderer.
Each component is defined by a `spec` object that contains the following properties:

- `description`: A brief description of the component.
- `tags`: Tags that describe the component. May contains one or more of the following tags:
  - `Input`: The component is used for form inputs.
  - `Content`: The component is used for content such as headings, paragraphs, and lists.
  - `Layout`: The component is used for layout such as containers, grids, and columns.
  - `Action`: The component is used for actions such as buttons, links, and navigation.
- `props`: A Zod schema that defines the properties of the component.
- `events`: An array of event names that the component emits.

The `spec` object is used to generate the JSON schema for the component, which is then used to validate the component props and events.
