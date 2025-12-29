const CodeBlock = ({ children }) => (
  <div className="grid grid-cols-1 w-full max-w-full rounded-xl border border-[#1f2937] bg-[#0f172a] shadow-inner my-4 overflow-hidden">
    <div className="w-full overflow-x-auto custom-scrollbar">
      <pre className="p-4 sm:p-5 text-xs sm:text-sm text-[#e5e7eb] leading-relaxed whitespace-pre font-mono min-w-max">
        <code>{children}</code>
      </pre>
    </div>
  </div>
);

const AppsAndAppStore = () => {
  return (
    <article className="w-full max-w-5xl mx-auto flex flex-col gap-16 sm:gap-20 text-[#1b4332] px-4 sm:px-6 md:px-8 py-8 overflow-x-hidden">
      <section className="flex flex-col gap-6 w-full min-w-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight break-words">
          Apps & App Store
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#2d6a4f] max-w-3xl">
          Everything on CalSci runs as an app. Apps control the display, handle
          keypad input, interact with sensors, and perform calculations — all
          using MicroPython.
        </p>
      </section>
      <section className="flex flex-col gap-6 w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          How a CalSci App Works
        </h2>
        <p className="text-base sm:text-lg text-[#2d6a4f] max-w-3xl">
          A CalSci app is a Python function that runs in a loop, listens to
          keypad events, updates the display, and performs actions based on user
          input.
        </p>
      </section>
      <section className="flex flex-col gap-4 w-full min-w-0">
        <h3 className="text-xl sm:text-2xl font-semibold">
          Step 1: Define Inputs & UI
        </h3>
        <CodeBlock>{`form.input_list = {
  "inp_0": " ",
  "inp_1": " "
}

form.form_list = [
  "Addition",
  "1st Number", "inp_0",
  "2nd Number", "inp_1"
]

form.update()
display.clear_display()
form_refresh.refresh()`}</CodeBlock>

        <p className="text-[#2d6a4f] max-w-3xl text-sm sm:text-base">
          <strong>input_list</strong> stores user inputs.
          <strong>form_list</strong> defines what appears on the screen. Any
          item named <code>inp_0</code>, <code>inp_1</code> becomes an input
          field.
        </p>
      </section>
      <section className="flex flex-col gap-4 w-full min-w-0">
        <h3 className="text-xl sm:text-2xl font-semibold">
          Step 2: Listen to Keypad Input
        </h3>
        <CodeBlock>{`while True:
    inp = typer.start_typing()`}</CodeBlock>
        <p className="text-[#2d6a4f] max-w-3xl text-sm sm:text-base">
          Every CalSci app runs inside a loop.
          <strong>start_typing()</strong> listens to keypad events like OK,
          BACK, ALPHA, BETA, numbers, and navigation keys.
        </p>
      </section>
      <section className="flex flex-col gap-4 w-full min-w-0">
        <h3 className="text-xl sm:text-2xl font-semibold">
          Step 3: Perform Calculation
        </h3>
        <CodeBlock>{`elif inp == "ok":
    try:
        n1 = float(form.inp_list()["inp_0"])
        n2 = float(form.inp_list()["inp_1"])
        result = " = " + str(n1 + n2)
    except:
        result = " = error"

    form.form_list.append(result)
    form.update()
    form.update_buffer("nav_u")
    form_refresh.refresh()`}</CodeBlock>

        <p className="text-[#2d6a4f] max-w-3xl text-sm sm:text-base">
          When the user presses <strong>OK</strong>, the app reads input values,
          performs the calculation, and displays the result.
        </p>
      </section>
      <section className="flex flex-col gap-4 w-full min-w-0">
        <h3 className="text-xl sm:text-2xl font-semibold">
          Step 4: Handle Keypad Modes
        </h3>
        <CodeBlock>{`elif inp in ["alpha", "beta"]:
    keypad_state_manager(x=inp)
    form.update_buffer("")`}</CodeBlock>
        <p className="text-[#2d6a4f] max-w-3xl text-sm sm:text-base">
          This logic handles keypad mode switching and must be present in every
          form-based CalSci app.
        </p>
      </section>
      <section className="flex flex-col gap-6 w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Complete Example App
        </h2>

        <CodeBlock>{`from data_modules.object_handler import keypad_state_manager

def add_2_nums():
    form.input_list = {"inp_0": " ", "inp_1": " "}
    form.form_list = ["Addition", "1st Number", "inp_0", "2nd Number", "inp_1"]

    form.update()
    display.clear_display()
    form_refresh.refresh()

    while True:
        inp = typer.start_typing()

        if inp == "back":
            app.set_app_name("installed_apps")
            app.set_group_name("root")
            break

        elif inp == "ok":
            try:
                n1 = float(form.inp_list()["inp_0"])
                n2 = float(form.inp_list()["inp_1"])
                result = " = " + str(n1 + n2)
            except:
                result = " = error"

            form.form_list.append(result)
            form.update()
            form.update_buffer("nav_u")
            form_refresh.refresh()

        elif inp in ["alpha", "beta"]:
            keypad_state_manager(x=inp)
            form.update_buffer("")
        else:
            form.update_buffer(inp)

        form_refresh.refresh()`}</CodeBlock>
      </section>
      <section className="flex flex-col gap-6 w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Publishing to App Store
        </h2>
        <p className="text-[#2d6a4f] max-w-3xl text-sm sm:text-base">
          Upload your app to your CalSci account and publish it to the App
          Store. Users can install apps wirelessly over Wi-Fi — no cables
          required.
        </p>
      </section>
      <section className="pt-10 border-t border-[#b7e4c7]/50 w-full min-w-0">
        <p className="text-[#2d6a4f] text-sm">
          Use the sidebar to explore SDK, Simulator, and VS Code Extension in
          more detail.
        </p>
      </section>
    </article>
  );
};

export default AppsAndAppStore;