import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { ISettingInput } from "@/types";
import { TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default function CarouselForm({
  form,
  id,
}: {
  form: UseFormReturn<ISettingInput>;
  id: string;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "carousels",
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const t = useTranslations("Admin.AdminSettings");

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>{t("Carousels")}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-6">
          {fields.map((field, index) => {
            const image = watch(`carousels.${index}.image`);

            return (
              <div
                key={field.id}
                className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start"
              >
                {/* TITLE */}
                <FormField
                  control={form.control}
                  name={`carousels.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {index === 0 && <FormLabel>{t("Title")}</FormLabel>}

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Title"
                          value={field.value ?? ""}
                        />
                      </FormControl>

                      <FormMessage>
                        {errors.carousels?.[index]?.title?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* URL */}
                <FormField
                  control={form.control}
                  name={`carousels.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {index === 0 && <FormLabel>{t("Url")}</FormLabel>}

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Url"
                          value={field.value ?? ""}
                        />
                      </FormControl>

                      <FormMessage>
                        {errors.carousels?.[index]?.url?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* BUTTON CAPTION */}
                <FormField
                  control={form.control}
                  name={`carousels.${index}.buttonCaption`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {index === 0 && <FormLabel>{t("Caption")}</FormLabel>}

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Button caption"
                          value={field.value ?? ""}
                        />
                      </FormControl>

                      <FormMessage>
                        {errors.carousels?.[index]?.buttonCaption?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* IMAGE */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`carousels.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && <FormLabel>{t("Image")}</FormLabel>}

                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Image URL"
                            value={field.value ?? ""}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {image ? (
                    <div className="relative w-fit">
                      <Image
                        src={image}
                        alt="carousel image"
                        width={100}
                        height={100}
                        className="h-20 w-20 rounded-md object-cover"
                      />

                      {/* DELETE IMAGE */}
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => {
                          form.setValue(`carousels.${index}.image`, "");
                        }}
                      >
                        <TrashIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <UploadButton
                      endpoint="imageUploader"
                      appearance={{
                        container:
                          "flex flex-col items-center justify-center gap-1",
                        button:
                          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg border shadow-sm transition-all",
                        allowedContent: "text-muted-foreground text-sm",
                      }}
                      onClientUploadComplete={(res: { url: string }[]) => {
                        form.setValue(`carousels.${index}.image`, res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  )}
                </div>

                {/* DELETE CAROUSEL */}
                <div className="flex flex-col items-center gap-2">
                  {index === 0 && (
                    <div className="text-sm font-medium">{t("Action")}</div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                url: "",
                title: "",
                image: "",
                buttonCaption: "",
              })
            }
          >
            {t("Add Carousel")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
