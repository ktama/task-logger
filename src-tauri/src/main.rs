#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .setup(|app| {
            let app_handle = app.app_handle();
            std::thread::spawn(move || loop {
                app_handle
                    .emit_all("get-date", "ping frontend".to_string())
                    .unwrap();
                std::thread::sleep(std::time::Duration::from_secs(1));
            });
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}
