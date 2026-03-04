import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.spacing[6],
  },
  section: {
    marginBottom: theme.spacing[4],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing[3],
  },
  sectionIcon: {
    fontSize: theme.sizes.iconMd,
    marginRight: theme.spacing[3],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
  },
  bodyText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    lineHeight:
      theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  featuresGrid: {
    gap: theme.spacing[2],
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureBullet: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeights.bold,
    marginRight: theme.spacing[2],
    marginTop: theme.spacing[1] / 2,
  },
  featureText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    lineHeight:
      theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    flex: 1,
  },
  linksContainer: {
    gap: theme.spacing[1],
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing[2],
  },
  linkText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeights.medium,
  },
  linkArrow: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.tertiary,
  },
  profileGrid: {
    gap: theme.spacing[3],
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  profileLabel: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeights.medium,
  },
  profileValue: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: "right",
    marginLeft: theme.spacing[4],
  },
  jsonContainer: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing[4],
  },
  jsonText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.primary,
    fontFamily: "monospace",
    lineHeight:
      theme.typography.lineHeights.normal * theme.typography.fontSizes.sm,
  },
});
