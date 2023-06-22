import {
  Col,
  FormikAutoComplete,
  FormikNumberField,
  FormikPassWordField,
  FormikTextField,
  Row,
} from "features/ui";
import { Form, Formik } from "formik";
import Link from "next/link";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import * as yup from "yup";

export const ShowCase = () => {
  const menuLeft = useRef<Menu>(null);
  const [items, setItems] = useState<
    {
      hey: string;
      id: string;
    }[]
  >([
    {
      hey: "United Kingdom",
      id: "UK",
    },
    { hey: "United States", id: "USA" },
    { hey: "Bangladesh", id: "bn-bd" },
    { hey: "India", id: "ind" },
    { hey: "India", id: "ind" },
    { hey: "Pakistan", id: "pak" },
  ]);

  const search = (event: AutoCompleteCompleteEvent) => {
    let _filteredCountries;

    if (!event?.query?.trim().length) {
      _filteredCountries = [...items];
    } else {
      _filteredCountries = items.filter((option) => {
        return option.hey.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setItems(_filteredCountries);
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const MenuItems = [
    {
      label: "Options",
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {},
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {},
        },
      ],
    },
    {
      label: "Navigate",
      items: [
        {
          label: "React Website",
          icon: "pi pi-external-link",
          url: "https://reactjs.org/",
        },
        {
          label: "Router",
          icon: "pi pi-upload",
          command: () => {
            //router.push('/fileupload');
          },
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <div>
        <Link href="/">Homepage</Link>
      </div>
      <div className="card flex justify-content-center">
        <Dropdown
          options={cities}
          optionLabel="name"
          placeholder="Select a City"
          className="w-full md:w-14rem"
        />
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quaerat
        odit. Exercitationem possimus doloribus non quia quasi odit fugiat,
        quidem voluptas explicabo a repudiandae saepe rem voluptate culpa qui!
        Debitis consectetur doloribus atque ipsum illum sequi laboriosam
        repudiandae doloremque repellat nemo. Alias autem corporis, officiis
        odit vel, illo cupiditate veritatis beatae vero necessitatibus enim
        tempore omnis. Est odio quo architecto dolores rerum soluta repellendus
        earum consequatur, natus, voluptatem corporis sequi rem quos inventore
        ab maxime adipisci doloremque sed dolorum repudiandae, pariatur vitae
        accusamus optio. Tempore, harum aspernatur excepturi quos at suscipit
        atque nostrum. Esse quam dolores enim id sapiente quis cumque velit
        nostrum voluptatibus saepe facilis atque assumenda, quidem tenetur vitae
        dolore eligendi perferendis, reiciendis, rerum impedit sunt fugiat.
        Cumque totam ea culpa sequi fugiat illum, sit nulla minima sed quis
        deserunt, voluptates rem placeat odio delectus amet voluptate laboriosam
        qui. Culpa rerum quis dolore aliquid? Cum asperiores doloribus nihil,
        non optio quo officia aliquam magnam tempora voluptatum provident magni
        ut veritatis! Officia in accusantium praesentium consequatur at quod!
        Libero, numquam molestias cupiditate odio illo molestiae nemo maxime
        doloremque assumenda suscipit aliquam explicabo reiciendis eum beatae?
        Accusamus architecto vitae pariatur praesentium! Consequatur autem
        voluptatem natus minima enim ullam commodi et!
      </div>

      <div className="card flex justify-content-center sticky">
        <Menu model={MenuItems} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          label="Show Left"
          icon="pi pi-align-left"
          className="mr-2"
          onClick={(event) => menuLeft?.current?.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
      <br />
      <Formik
        initialValues={{
          name: "",
          age: 0,
          password: "",
          country: { hey: "", id: "" },
        }}
        validationSchema={yup.object({
          name: yup.string().min(19).required(),
          password: yup.string().min(3).max(6),
          age: yup.number().positive().required(),
          country: yup.number().required(),
        })}
        onSubmit={() => {}}
      >
        <Form>
          <FormikTextField
            name="name"
            textFieldProps={{
              label: "Username",
              helperText: "hey",
            }}
          />

          <FormikNumberField
            name="age"
            numberFieldProps={{
              label: "Age",
            }}
          />
          <div
            style={{
              width: "100%",
            }}
          >
            <FormikPassWordField
              name="password"
              passwordFieldProps={{
                label: "Password",
                placeholder: "Enter your password.",
              }}
            />
          </div>

          <br />
          <br />
          <br />
          <div>
            <FormikAutoComplete
              name="country"
              autoCompleteProps={{
                label: "Country",
                suggestions: items,
                field: "hey",
                completeMethod: search,
                dropdown: true,
              }}
            />
          </div>
        </Form>
      </Formik>
      <br />
      <hr />
      <div className="mt-2">
        <h2>ROW - COL</h2>
        <br />
        <hr />

        <div>
          <Row>
            <Col>One</Col>
            <Col>Two</Col>
            <Col>Three</Col>
          </Row>
        </div>

        <div>
          <Avatar
            label="A"
            style={{
              background: "red",
            }}
            shape="square"
            size="normal"
          />
        </div>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          perspiciatis culpa eveniet, dolorem distinctio libero mollitia
          consequatur minus eos, voluptates soluta ea ipsa deserunt corporis
          fugiat? Quia, nam dignissimos! Nemo corrupti quisquam voluptatibus
          voluptates, laboriosam sint nobis et obcaecati optio veritatis illo.
          Odit incidunt molestias blanditiis voluptatem quibusdam modi
          exercitationem vitae dignissimos sint ratione autem illo voluptatibus
          maxime placeat earum recusandae, reprehenderit repellendus quae
          facilis repellat cupiditate fugit voluptas quaerat. Molestiae illum
          dicta in, voluptatum nisi delectus. Dolores, ut, rerum corporis nihil
          deleniti iure suscipit animi fuga illo, veritatis aliquam porro enim
          quia voluptate molestias amet nobis totam! Accusamus delectus aliquid
          et velit quasi minima repellendus officiis veniam nulla natus neque,
          similique tenetur. Quaerat ducimus delectus culpa, ex at cum! Fuga
          voluptates excepturi minima id, est, ipsam iste at cum molestias,
          doloremque dolorem deserunt nostrum harum accusamus debitis commodi
          atque! Obcaecati consequuntur harum, odio officiis vero, laudantium
          repellendus quas veniam eos ducimus veritatis. Officia saepe illo
          laudantium perferendis optio voluptatibus nesciunt, in amet quidem?
          Maiores aperiam blanditiis ducimus impedit modi itaque quis
          exercitationem voluptate earum voluptatibus! Repellendus,
          reprehenderit? Corporis laudantium inventore fugiat eum repellat quos
          eveniet. In dolorum consequuntur, hic sint quis necessitatibus!
          Repudiandae modi et molestiae. Nemo, quisquam possimus.
        </div>
      </div>
    </div>
  );
};
