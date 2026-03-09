export default function Footer() {
  return (
    <footer className="bg-blue-700 text-blue-100 text-center py-4 text-sm mt-auto">
      <p>
        &copy; SimpleEstoque © {new Date().getFullYear()}. - Sistema de Gestão
        Open Source
      </p>
    </footer>
  );
}
