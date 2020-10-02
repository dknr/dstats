const startProcess = (script: string) => {
  let process = {} as ReturnType<typeof Deno.run>;
  const start = () => {
    process = Deno.run({
      cmd: [
        'deno',
        'run',
        '--allow-read',
        '--allow-net',
        '--allow-run',
        '--allow-env',
        '--unstable',
        script,
      ]
    });
  };
  const stop = () => process.kill(15);
  return {
    process,
    stop,
    start,
    restart: () => {
      stop();
      start();
    }
  }
}

if (import.meta.main) {
  console.log(Deno.args);
  const script = Deno.args[0];
  let {start, restart, stop} = startProcess(script);
  start();
  void (async () => {
    for await (const event of Deno.watchFs(Deno.cwd(), { recursive: true })) {
      if (event.kind === "access") {
        continue;
      }
      console.log(event);
      restart();
    }
  })();
  await Deno.signal(Deno.Signal.SIGINT);
  stop();
  Deno.exit();
}
