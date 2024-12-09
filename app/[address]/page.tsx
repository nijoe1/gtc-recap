"use client";

import SliderWithData from "@/components/SliderWithData";

const AddressPage = ({
  params,
}: {
  params: { address: string };
}): JSX.Element => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <SliderWithData params={params} />
    </main>
  );
};

export default AddressPage;
