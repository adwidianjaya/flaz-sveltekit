const schema = {
  elements: [
    {
      type: "Card",
      props: {
        title: "Greeting Form",
        description: "Enter your name to see a greeting",
        maxWidth: "md",
        centered: true,
      },
      children: [
        {
          type: "TextInput",
          props: {
            label: "Your Name",
            placeholder: "Enter your name",
            value: "{$states.form.name}",
            disabled: false,
            multiline: false,
          },
        },
        {
          type: "Text",
          props: {
            text: "{$states.form.name === '' ? 'No Name' : $states.form.name.length > 10 ? 'Name is too long' : $states.form.name === 'Adhe' ? 'Noice' : 'Hello, ' + $states.form.name + '!' }",
            level: "h3",
            class:
              "{$states.form.name === '' ? 'text-orange-500' : $states.form.name.length > 10 ? 'text-red-500' : ''} font-bold",
          },
          name: "greeting",
        },
      ],
    },
  ],
  states: {
    form: {
      name: "manteps ",
    },
  },
};

export { schema };
